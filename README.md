### 获取小程序包并编译

1. 第一步下载一个模拟器（推荐使用自带root的模拟器），我使用的是夜神模拟器

步骤

- 在模拟器安装微信

-  在模拟器里打开微信，然后在微信中运行你想要获取的下程序

-  在文件管理器打开根目录/data/data/com.tencent.mm/MicroMsg/

![enter image description here](https://img-blog.csdnimg.cn/20181208142850471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MDM1NDI1,size_16,color_FFFFFF,t_70)

![enter image description here](https://img-blog.csdnimg.cn/20181208142928958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MDM1NDI1,size_16,color_FFFFFF,t_70)

![enter image description here](https://img-blog.csdnimg.cn/20181208143209160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MDM1NDI1,size_16,color_FFFFFF,t_70)


---

### 获取压缩包之后 

[下载压缩程序解压](https://github.com/Groverjun/wxGrabbag)

- 把下载好的小程序包放入app文件下

- 执行下面命令

```
node .\wuWxapkg.js .\app\_-86450044_13.wxapkg

'_-86450044_13.wxapkg'为包名
```

