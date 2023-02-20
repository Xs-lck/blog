import Mock from "mockjs";
import mine from "@/assets/mine.png"
import qq from "@/assets/qq.png"
import weixin from "@/assets/weixin.png"
import siteicon from "@/assets/siteicon.png"
Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: mine,
        siteTitle: "TiAMo.",
        github: "https://github.com/DuYi-Edu",
        qq: "1491736407",
        qqQrCode: qq,
        weixin: "TiAMo.",
        weixinQrCode: weixin,
        mail: "1491736407@qq.com",
        icp: "黑ICP备17001719号",
        githubName: "xs-Lck",
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
    },
});