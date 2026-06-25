import{E as e,b as t,d as n,f as r,k as i,l as a,p as o,s,t as c,y as l}from"./index-RyKdWDlo.js";var u=`/ZWU-2026-2-004/assets/circuit-BMsGfmYI.jpg`,d={class:`iot-alarm`},f={class:`doc section`},p={class:`container doc__container`},m={class:`doc-block`},h={class:`table-wrap`},g={class:`doc-table`},_={class:`doc-block`},v={class:`table-wrap`},y={class:`doc-table`},b={class:`inline-code`},x={class:`circuit-figure`},S=[`src`],C={class:`doc-block`},w={class:`table-wrap`},T={class:`doc-table`},E={class:`inline-code`},D={class:`doc-block`},O={class:`table-wrap`},k={class:`doc-table`},A={class:`inline-code`},j=`{"sound": "fire_alarm"}`,M=`// Wi-Fi
const char* ssid     = "你的WiFi名称";
const char* password = "你的WiFi密码";

// 云端识别接口地址
const char* xiaoziURL = "http://192.168.1.100:5000/recognize";

// 引脚定义（根据实际接线修改）
#define LED_PIN       2
#define MOTOR_PIN     4
#define MIC_PIN      34   // 必须是 ADC1 通道`,N=`#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <U8g2lib.h>
#include <driver/i2s.h>

// ================= 配置参数 =================
const char* ssid     = "mywifi";
const char* password = "12345678";

// 小智声音识别接口（请替换为实际地址）
const char* xiaoziURL = "http://xiaozhi.me/recognize";

// 录音参数
#define SAMPLE_RATE     16000
#define RECORD_TIME     2       // 录音时长（秒）
#define AUDIO_BUFFER_SIZE (SAMPLE_RATE * RECORD_TIME)  // 16位，单声道

// 外设引脚
#define LED_PIN         2
#define MOTOR_PIN       4
#define MIC_PIN         34      // ADC1_CH6

// OLED（SSD1306 128x64 I2C）
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* clock=*/ 22, /* data=*/ 21);

// ================= 声音类型映射 =================
struct SoundEvent {
  const char* id;
  const char* displayText;
};
SoundEvent soundMap[] = {
  {"doorbell",      "门铃"},
  {"fire_alarm",    "火警"},
  {"baby_cry",      "婴儿哭"},
  {"kettle_whistle","水壶响"}
};
const int soundCount = sizeof(soundMap) / sizeof(SoundEvent);

// ================= 函数声明 =================
void connectWiFi();
void initI2S();
void recordAudio(int16_t* buffer, size_t samples);
String sendAudioToServer(const int16_t* buffer, size_t dataSize);
void handleRecognizedSound(const char* soundId);
void triggerAlert(const char* text);

// ================= 初始化 =================
void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(MOTOR_PIN, LOW);

  // OLED
  u8g2.begin();
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_wqy12_t_chinese2);  // 需要支持中文的字体
  u8g2.drawUTF8(0, 20, "声音监测中...");
  u8g2.sendBuffer();

  // 连接 WiFi
  connectWiFi();

  // 初始化 I2S ADC 录音
  initI2S();

  // 分配音频缓冲区（16位样本）
  // 注意：ESP32 动态分配大数组建议用 malloc，避免栈溢出
}

void loop() {
  // 分配音频缓冲区
  int16_t* audioBuffer = (int16_t*)malloc(AUDIO_BUFFER_SIZE * sizeof(int16_t));
  if (!audioBuffer) {
    Serial.println("内存不足！");
    delay(5000);
    return;
  }

  // 1. 录音
  Serial.println("开始录音...");
  recordAudio(audioBuffer, AUDIO_BUFFER_SIZE);
  Serial.println("录音结束");

  // 2. 发送到小智云端识别
  String soundId = sendAudioToServer(audioBuffer, AUDIO_BUFFER_SIZE * sizeof(int16_t));
  free(audioBuffer);

  // 3. 处理识别结果
  if (soundId.length() > 0) {
    handleRecognizedSound(soundId.c_str());
  } else {
    // 未识别到，恢复默认显示
    u8g2.clearBuffer();
    u8g2.drawUTF8(0, 20, "声音监测中...");
    u8g2.sendBuffer();
  }

  // 4. 间隔一段时间再检测
  delay(3000);
}

// ================= 连接 WiFi =================
void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("连接 WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi 已连接");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// ================= I2S ADC 初始化 =================
void initI2S() {
  i2s_config_t i2s_config = {
    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX | I2S_MODE_ADC_BUILT_IN),
    .sample_rate = SAMPLE_RATE,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = I2S_COMM_FORMAT_I2S_MSB,
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 8,
    .dma_buf_len = 512,
    .use_apll = false,
    .tx_desc_auto_clear = false,
    .fixed_mclk = 0
  };
  i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
  i2s_set_adc_mode(ADC_UNIT_1, ADC1_CHANNEL_6);  // GPIO34
  i2s_adc_enable(I2S_NUM_0);
}

// ================= 录音（阻塞式） =================
void recordAudio(int16_t* buffer, size_t samples) {
  size_t bytesRead;
  size_t totalBytes = samples * sizeof(int16_t);
  size_t offset = 0;

  // 开启 I2S 读取，直到录满所需样本数
  while (offset < totalBytes) {
    esp_err_t err = i2s_read(I2S_NUM_0,
                             (char*)buffer + offset,
                             totalBytes - offset,
                             &bytesRead,
                             portMAX_DELAY);
    if (err != ESP_OK) {
      Serial.println("I2S 读取错误");
      break;
    }
    offset += bytesRead;
  }

  // 录音后禁用 ADC 降低功耗（可选）
  // i2s_adc_disable(I2S_NUM_0);
}

// ================= 发送音频到小智接口 =================
String sendAudioToServer(const int16_t* buffer, size_t dataSize) {
  String recognizedSound = "";
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi 未连接");
    return recognizedSound;
  }

  HTTPClient http;
  http.begin(xiaoziURL);
  http.addHeader("Content-Type", "application/octet-stream");

  int httpCode = http.POST((uint8_t*)buffer, dataSize);
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("识别结果: " + payload);

      // 解析 JSON
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, payload);
      if (!error) {
        recognizedSound = doc["sound"].as<String>();
      } else {
        Serial.print("JSON 解析失败: ");
        Serial.println(error.c_str());
      }
    } else {
      Serial.printf("HTTP 错误代码: %d\\n", httpCode);
    }
  } else {
    Serial.printf("请求失败: %s\\n", http.errorToString(httpCode).c_str());
  }
  http.end();
  return recognizedSound;
}

// ================= 处理识别到的声音 =================
void handleRecognizedSound(const char* soundId) {
  // 查找对应的中文显示
  const char* displayText = nullptr;
  for (int i = 0; i < soundCount; i++) {
    if (strcmp(soundId, soundMap[i].id) == 0) {
      displayText = soundMap[i].displayText;
      break;
    }
  }

  if (displayText) {
    Serial.printf("识别到: %s\\n", displayText);
    triggerAlert(displayText);
  } else {
    Serial.printf("未知声音类型: %s\\n", soundId);
    // 可选显示"未知声音"
  }
}

// ================= 触发警报动作 =================
void triggerAlert(const char* text) {
  // OLED 显示
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_wqy12_t_chinese2);
  u8g2.drawUTF8(0, 20, "识别到:");
  u8g2.drawUTF8(0, 44, text);
  u8g2.sendBuffer();

  // LED 快速闪烁 3 次
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }

  // 震动马达开启 2 秒
  digitalWrite(MOTOR_PIN, HIGH);
  delay(2000);
  digitalWrite(MOTOR_PIN, LOW);
}`,P=c({__name:`ArduinoApp`,setup(c){let P=[{no:`1`,part:`ESP32-S3 开发板`,qty:`1`,note:`推荐使用带有 PSRAM 的型号`},{no:`2`,part:`MAX4466 麦克风模块`,qty:`1`,note:`带可调增益，模拟输出`},{no:`3`,part:`0.96 寸 OLED 屏`,qty:`1`,note:`SSD1306 驱动，I2C 接口，128×64`},{no:`4`,part:`LED`,qty:`1`,note:`任意颜色，需串联 220Ω 限流电阻`},{no:`5`,part:`震动马达`,qty:`1`,note:`手机扁平马达或偏心振动电机，需驱动电路`},{no:`6`,part:`NPN 三极管（S8050）`,qty:`1`,note:`驱动震动马达（若马达电流较大）`},{no:`7`,part:`电阻 1kΩ`,qty:`1`,note:`基极限流`},{no:`8`,part:`电阻 220Ω`,qty:`1`,note:`LED 限流`},{no:`9`,part:`面包板与杜邦线`,qty:`若干`,note:``}],F=[{dev:`OLED 屏`,fn:`SDA`,pin:`GPIO 21`,note:``},{dev:`OLED 屏`,fn:`SCL`,pin:`GPIO 22`,note:``},{dev:`OLED 屏`,fn:`VCC`,pin:`3.3V`,note:``},{dev:`OLED 屏`,fn:`GND`,pin:`GND`,note:``},{dev:`MAX4466`,fn:`OUT`,pin:`GPIO 34`,note:`ADC1_CH6，模拟输入`},{dev:`MAX4466`,fn:`VCC`,pin:`3.3V`,note:``},{dev:`MAX4466`,fn:`GND`,pin:`GND`,note:``},{dev:`LED`,fn:`正极`,pin:`GPIO 2 (经电阻)`,note:`负极接 GND`},{dev:`震动马达驱动`,fn:`控制端`,pin:`GPIO 4`,note:`通过三极管驱动`}],I=[{name:`U8g2`,use:`OLED 屏幕驱动`,how:`库管理搜索 U8g2，作者 oliver`},{name:`ArduinoJson`,use:`JSON 解析`,how:`库管理搜索 ArduinoJson，作者 Benoit Blanchon`}],L=[{fn:`setup()`,desc:`初始化外设、Wi-Fi、I2S、分配内存`},{fn:`loop()`,desc:`循环录音 → 发送 → 处理结果`},{fn:`connectWiFi()`,desc:`连接网络`},{fn:`initI2S()`,desc:`配置 I2S ADC 录音参数`},{fn:`recordAudio()`,desc:`从 MAX4466 读取指定时长的音频`},{fn:`sendAudioToServer()`,desc:`HTTP POST 发送音频并解析 JSON`},{fn:`handleRecognizedSound()`,desc:`根据 sound ID 查找中文并触发报警`},{fn:`triggerAlert()`,desc:`控制 OLED、LED、马达执行提醒动作`}];return(c,R)=>(l(),n(`div`,d,[R[20]||=a(`section`,{class:`page-hero`,"aria-labelledby":`iot-title`},[a(`div`,{class:`container`},[a(`span`,{class:`eyebrow`},`作业四 · Arduino application`),a(`h1`,{id:`iot-title`,class:`section-title`},`ESP32-S3 智能声音识别警报器`)])],-1),a(`section`,f,[a(`div`,p,[R[17]||=r(`<article class="doc-block" data-v-8d03efb8><h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>一</span>项目概述</h2><p class="doc-p" data-v-8d03efb8> 本项目基于 ESP32-S3 开发板，结合 MAX4466 麦克风模块采集环境声音，通过 Wi-Fi 将音频发送至“小智”云端识别服务，自动识别<strong data-v-8d03efb8>门铃、火警、婴儿哭、水壶响</strong>等指定声音。一旦检测到目标声音，设备将同步触发以下动作： </p><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8><strong data-v-8d03efb8>OLED 屏幕</strong>显示对应的中文提示文字；</li><li data-v-8d03efb8><strong data-v-8d03efb8>震动马达</strong>震动 2 秒；</li><li data-v-8d03efb8><strong data-v-8d03efb8>LED</strong> 快速闪烁 3 次。</li></ul><p class="doc-p" data-v-8d03efb8>适用于家庭安全提醒、无障碍辅助、婴幼儿监护等场景。</p></article>`,1),a(`article`,m,[R[1]||=a(`h2`,{class:`doc-h2`},[a(`span`,{class:`doc-num`},`二`),o(`硬件清单`)],-1),a(`div`,h,[a(`table`,g,[R[0]||=a(`thead`,null,[a(`tr`,null,[a(`th`,null,`序号`),a(`th`,null,`元器件`),a(`th`,null,`数量`),a(`th`,null,`说明`)])],-1),a(`tbody`,null,[(l(),n(s,null,t(P,e=>a(`tr`,{key:e.no},[a(`td`,null,i(e.no),1),a(`td`,null,i(e.part),1),a(`td`,null,i(e.qty),1),a(`td`,null,i(e.note),1)])),64))])])]),R[2]||=a(`div`,{class:`callout`},[a(`strong`,null,`震动马达驱动说明：`),o(`ESP32 的 GPIO 输出电流不足以直接驱动普通振动马达，建议通过 NPN 三极管（如 S8050）驱动： `),a(`ul`,{class:`doc-list doc-list--bullet`},[a(`li`,null,`基极 → 1kΩ 电阻 → GPIO4；`),a(`li`,null,`集电极 → 马达正极（马达负极接 GND）；`),a(`li`,null,`发射极 → GND。`)]),o(` 若使用低功耗震动模块（自带驱动），可直接连接 GPIO4。 `)],-1)]),a(`article`,_,[R[5]||=a(`h2`,{class:`doc-h2`},[a(`span`,{class:`doc-num`},`三`),o(`硬件接线`)],-1),a(`div`,v,[a(`table`,y,[R[3]||=a(`thead`,null,[a(`tr`,null,[a(`th`,null,`外设`),a(`th`,null,`引脚功能`),a(`th`,null,`ESP32-S3 引脚`),a(`th`,null,`备注`)])],-1),a(`tbody`,null,[(l(),n(s,null,t(F,(e,t)=>a(`tr`,{key:t},[a(`td`,null,i(e.dev),1),a(`td`,null,i(e.fn),1),a(`td`,null,[a(`code`,b,i(e.pin),1)]),a(`td`,null,i(e.note),1)])),64))])])]),R[6]||=a(`div`,{class:`callout callout--warn`},[o(` ⚠️ `),a(`strong`,null,`重要：`),o(`ESP32-S3 的 ADC2 与 Wi-Fi 功能复用，请务必使用 ADC1 通道（GPIO34～39）。本项目使用 GPIO34，属于 ADC1_CH6。 `)],-1),a(`figure`,x,[a(`img`,{src:e(u),alt:`ESP32-S3 智能声音识别警报器面包板接线电路图`},null,8,S),R[4]||=a(`figcaption`,null,`整体接线电路图：ESP32-S3 连接 MAX4466 麦克风、OLED 屏、LED、震动马达`,-1)])]),a(`article`,C,[R[8]||=r(`<h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>四</span>软件准备</h2><h3 class="doc-h3" data-v-8d03efb8>1. Arduino IDE 环境</h3><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8>安装 ESP32 Arduino 核心（版本 ≥ 2.0.0）；</li><li data-v-8d03efb8>在“工具 → 开发板”中选择 <strong data-v-8d03efb8>ESP32S3 Dev Module</strong>，并根据板卡设置 Flash 大小、PSRAM（若支持，建议开启 OPI PSRAM）。</li></ul><h3 class="doc-h3" data-v-8d03efb8>2. 所需库</h3>`,4),a(`div`,w,[a(`table`,T,[R[7]||=a(`thead`,null,[a(`tr`,null,[a(`th`,null,`库名称`),a(`th`,null,`用途`),a(`th`,null,`安装方法`)])],-1),a(`tbody`,null,[(l(),n(s,null,t(I,e=>a(`tr`,{key:e.name},[a(`td`,null,[a(`code`,E,i(e.name),1)]),a(`td`,null,i(e.use),1),a(`td`,null,i(e.how),1)])),64))])])]),R[9]||=r(`<h3 class="doc-h3" data-v-8d03efb8>3. 云端识别服务（小智）</h3><p class="doc-p" data-v-8d03efb8> 程序默认向 HTTP 接口发送 PCM 音频流并接收 JSON 结果。需要自行部署或接入已存在的识别服务，接口规范如下： </p><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8><strong data-v-8d03efb8>URL：</strong><code class="inline-code" data-v-8d03efb8>http://&lt;服务器IP&gt;:&lt;端口&gt;/recognize</code></li><li data-v-8d03efb8><strong data-v-8d03efb8>方法：</strong>POST</li><li data-v-8d03efb8><strong data-v-8d03efb8>Content-Type：</strong>application/octet-stream</li><li data-v-8d03efb8><strong data-v-8d03efb8>请求体：</strong>16-bit 单声道 PCM 原始音频（16 kHz 采样率）</li></ul><p class="doc-p doc-p--muted" data-v-8d03efb8>响应示例：</p>`,4),a(`pre`,{class:`code-block`},[a(`code`,null,i(j))]),R[10]||=a(`p`,{class:`doc-p`},[o(` 支持的声音 ID 映射关系见代码中的 `),a(`code`,{class:`inline-code`},`soundMap`),o(` 数组，可根据需要扩展。若服务端要求 WAV 格式，请修改发送函数，在 PCM 数据前添加 44 字节 WAV 文件头。 `)],-1)]),a(`article`,{class:`doc-block`},[R[11]||=a(`h2`,{class:`doc-h2`},[a(`span`,{class:`doc-num`},`五`),o(`项目配置`)],-1),R[12]||=a(`p`,{class:`doc-p`},`在源码开头修改以下宏定义以匹配实际环境：`,-1),a(`pre`,{class:`code-block`},[a(`code`,null,i(M))])]),R[18]||=r(`<article class="doc-block" data-v-8d03efb8><h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>六</span>编译与上传</h2><ol class="doc-list" data-v-8d03efb8><li data-v-8d03efb8>用 USB 数据线连接 ESP32-S3 开发板与电脑；</li><li data-v-8d03efb8>在 Arduino IDE 选择正确的端口和开发板；</li><li data-v-8d03efb8>点击上传按钮，等待编译及烧录完成；</li><li data-v-8d03efb8>打开串口监视器（波特率 115200），查看连接与识别日志。</li></ol></article><article class="doc-block" data-v-8d03efb8><h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>七</span>使用方法</h2><ol class="doc-list" data-v-8d03efb8><li data-v-8d03efb8>设备上电后，OLED 屏幕显示“声音监测中…”；</li><li data-v-8d03efb8> 系统自动循环进行：录制 2 秒环境声音 → 通过 HTTP 上传至识别服务 → 解析返回结果； </li><li data-v-8d03efb8> 若识别到预设声音（如“门铃”），设备立即触发警报：OLED 显示“识别到：门铃”、LED 快速闪烁 3 次、震动马达振动 2 秒； </li><li data-v-8d03efb8>一次报警结束后，屏幕恢复监测状态，间隔约 3 秒后继续下一轮检测。</li></ol></article>`,2),a(`article`,D,[R[14]||=a(`h2`,{class:`doc-h2`},[a(`span`,{class:`doc-num`},`八`),o(`代码结构简要说明`)],-1),a(`div`,O,[a(`table`,k,[R[13]||=a(`thead`,null,[a(`tr`,null,[a(`th`,null,`函数`),a(`th`,null,`功能描述`)])],-1),a(`tbody`,null,[(l(),n(s,null,t(L,e=>a(`tr`,{key:e.fn},[a(`td`,null,[a(`code`,A,i(e.fn),1)]),a(`td`,null,i(e.desc),1)])),64))])])])]),a(`article`,{class:`doc-block`},[R[15]||=a(`h2`,{class:`doc-h2`},[a(`span`,{class:`doc-num doc-num--code`},`</>`),o(`完整源码（Arduino）`)],-1),R[16]||=a(`p`,{class:`doc-p doc-p--muted`},`可直接复制到 Arduino IDE 编译上传，使用前请修改顶部 Wi-Fi 与接口地址配置。`,-1),a(`pre`,{class:`code-block`},[a(`code`,null,i(N))])]),R[19]||=r(`<article class="doc-block" data-v-8d03efb8><h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>九</span>常见问题</h2><h3 class="doc-h3" data-v-8d03efb8>1. OLED 显示乱码或不显示中文</h3><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8>中文字体 <code class="inline-code" data-v-8d03efb8>u8g2_font_wqy12_t_chinese2</code> 需要占用较大 Flash 空间，请确保开发板 Flash ≥ 4MB；</li><li data-v-8d03efb8>若仍无法显示，可改用英文标识（如将 “门铃” 改为 “Doorbell”），或使用 U8g2 自带的字体生成工具定制。</li></ul><h3 class="doc-h3" data-v-8d03efb8>2. 录音数据全是零或声音极小</h3><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8>检查 MAX4466 模块的增益电位器，缓慢调节至合适放大倍数（OUT 脚静音时电压约 1.6V）；</li><li data-v-8d03efb8>确保 I2S ADC 模式配置正确，引脚号对应。</li></ul><h3 class="doc-h3" data-v-8d03efb8>3. HTTP 请求失败</h3><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8>确认服务器地址与端口填写正确，ESP32 与服务器在同一局域网；</li><li data-v-8d03efb8>检查防火墙是否开放对应端口；</li><li data-v-8d03efb8>串口监视器中会输出详细错误信息，请根据提示排查。</li></ul><h3 class="doc-h3" data-v-8d03efb8>4. 识别结果不准确</h3><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8>录音环境噪声过大，可适当缩短识别距离或降低增益；</li><li data-v-8d03efb8>云端模型可能需要针对具体声音优化，请联系服务提供者调整。</li></ul></article><article class="doc-block" data-v-8d03efb8><h2 class="doc-h2" data-v-8d03efb8><span class="doc-num" data-v-8d03efb8>十</span>注意事项</h2><ul class="doc-list doc-list--bullet" data-v-8d03efb8><li data-v-8d03efb8><strong data-v-8d03efb8>供电：</strong>ESP32-S3 和 OLED 使用 3.3V，震动马达若为 5V 需独立供电并注意共地；</li><li data-v-8d03efb8><strong data-v-8d03efb8>音频质量：</strong>MAX4466 输出为单声道模拟信号，接线应尽量短，远离电源噪声源；</li><li data-v-8d03efb8><strong data-v-8d03efb8>内存占用：</strong>2 秒 16kHz/16bit 录音需要约 64KB 内存，开启 PSRAM 可保证稳定性，否则建议缩短录音时长；</li><li data-v-8d03efb8><strong data-v-8d03efb8>安全：</strong>震动马达长时间运行可能过热，请勿在无人值守时持续震动。</li></ul></article>`,2)])])]))}},[[`__scopeId`,`data-v-8d03efb8`]]);export{P as default};