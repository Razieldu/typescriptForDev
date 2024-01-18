import { useSettingStore } from "@/store";

export const dealWithLanguage = (locale: any) => {

    const { changeElementPlusLanguage } = useSettingStore();
    
    const switchToEnglish = function () {
        // @ts-ignore
        changeElementPlusLanguage("en");
        locale.value = "en";
        localStorage.setItem("language", "en")
    };

    const switchToTwChinese = function () {
        // @ts-ignore
        changeElementPlusLanguage("zh-tw");
        locale.value = "zh-tw";
        localStorage.setItem("language", "zh-tw")
    };

    const switchToChinaChinese = function () {
        changeElementPlusLanguage("zh-cn");
        locale.value = "zh-cn"
        localStorage.setItem("language", "zh-cn")
    };

    const switchToJapanese = function () {
        changeElementPlusLanguage("ja");
        locale.value = "ja"
        localStorage.setItem("language", "ja")
    };


    const handleLanguage = (language: string) => {
        switch (language) {
            case "zh-tw":
                switchToTwChinese();
                break;
            case "en":
                switchToEnglish();
                break;
            case "zh-cn":
                switchToChinaChinese();
                break;
            case "ja":
                switchToJapanese()
                break
        }
    };

    return {
        handleLanguage,
    }
}


