/// <reference types="vite/client" />

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.png" {
  const pngValue: string;
  export default pngValue;
}

declare module "*.jpg" {
  const jpgValue: string;
  export default jpgValue;
}

declare module "*.jpeg" {
  const jpegValue: string;
  export default jpegValue;
}

declare module "*.gif" {
  const gifValue: string;
  export default gifValue;
}

declare module "*.svg" {
  const svgValue: string;
  export default svgValue;
}

declare module "react-toastify/dist/ReactToastify.css";

declare module "react-github-login" {
  import React from "react";

  interface GitHubLoginProps {
    clientId?: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    buttonText?: string;
    valid?: boolean;
    redirectUri?: string;
    className?: string;
    children?: React.ReactNode;
  }

  const GitHubLogin: React.FC<GitHubLoginProps>;
  export default GitHubLogin;
}

declare module "react-facebook-login" {
  import React from "react";

  interface FacebookLoginProps {
    appId?: string;
    autoLoad?: boolean;
    fields?: string;
    icon?: string;
    callback?: (response: any) => void;
  }

  const FacebookLogin: React.FC<FacebookLoginProps>;
  export default FacebookLogin;
}

declare module "react-google-login" {
  import React from "react";

  interface GoogleLoginProps {
    clientId?: string;
    buttonText?: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    cookiePolicy?: string;
    responseType?: string;
  }

  interface GoogleLogoutProps {
    clientId?: string;
    buttonText?: string;
    onClick?: () => void;
    onLogoutSuccess?: () => void;
    onFailure?: () => void;
  }

  const GoogleLogin: React.FC<GoogleLoginProps>;
  const GoogleLogout: React.FC<GoogleLogoutProps>;
  export { GoogleLogin, GoogleLogout };
}
