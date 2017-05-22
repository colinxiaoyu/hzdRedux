package com.extension;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.MessageDigest;

/**
 * Created by Colin on 2017/4/18.
 */
public class Md5Moudle extends ReactContextBaseJavaModule {

    public Md5Moudle(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Md5";
    }
    @ReactMethod
    public void getMd5(String password,Promise promise){
        MessageDigest messageDigest = null;
        StringBuffer md5StrBuff = new StringBuffer();
        try {
            messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.reset();
            messageDigest.update(password.getBytes("UTF-8"));

            byte[] byteArray = messageDigest.digest();
            for (int i = 0; i < byteArray.length; i++)
            {
                if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
                    md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
                else
                    md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
            }
            promise.resolve(md5StrBuff.toString().toUpperCase());
        } catch (Exception e) {
//            throw new RuntimeException();
            promise.reject("解析密码异常");
        }
//        return md5StrBuff.toString().toUpperCase();//字母大写
    }
}
