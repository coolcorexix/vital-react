package com.vitalreact;
//import com.emekalites.react.alarm.notification.ANPackage;  // <--- Import Package notification
import android.app.Application;
import com.airbnb.android.react.maps.MapsPackage;
import io.invertase.firebase.RNFirebasePackage; //firebase package
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.database.RNFirebaseDatabasePackage; //Firebase database
import com.magus.fblogin.FacebookLoginPackage; //fb log in
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.emekalites.react.alarm.notification.ANPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGooglePlacesPackage(),
          new VectorIconsPackage(),
          new ANPackage(),
          new MapsPackage(),
          new RNFirebasePackage(),// firebase package
          new RNFirebaseAuthPackage(), // firebase auth package
          new RNFirebaseDatabasePackage(),
          new FacebookLoginPackage(),
          new AnExampleReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
