import { CSSProperties, FC, ReactElement, useState, useEffect } from "react";
import classes from "./ThemeToggle.module.css";
import Moon from "../../../public/Assets/moon.svg";
import Sun from "../../../public/Assets/sun.svg";

type Props = {
    style?: CSSProperties,
    className?: string
}

export const ThemeToggle: FC<Props> = ({style, className}): ReactElement => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean | undefined>(undefined);
  const handleToggle = () => {
        if(isDarkTheme){
            setIsDarkTheme(false);
        }else{
            setIsDarkTheme(true);
        }
  };

  const getMediaQueryPreference = () => {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasPreference = typeof mql.matches === "boolean";
    if (hasPreference) {
      return mql.matches ? "dark" : "light";
    }
  };

  const storeUserSetPreference = (pref: string) => {
    localStorage.setItem("theme", pref);
  };

  const getUserSetPreference  = (): string | null => {
    return localStorage.getItem("theme");
  };

  useEffect(() => {
    const userSetPreference = getUserSetPreference();
    if (userSetPreference !== null) {
      setIsDarkTheme(userSetPreference === "dark" ? true: false);
    } else {
      const mediaQueryPreference = getMediaQueryPreference();
      setIsDarkTheme(mediaQueryPreference === "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof isDarkTheme !== "undefined") {
      if (isDarkTheme) {
        storeUserSetPreference("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        storeUserSetPreference("light");
        document.documentElement.removeAttribute("data-theme");
      }
    }
  }, [isDarkTheme]);

    return (
        <>
            <div style={style} className={`${classes.toggleWrapper} ${className}`}>
                {
                    isDarkTheme ? 
                    <div onClick={handleToggle}>
                        <Moon className={classes.moonIcon}/>
                    </div> :
                    <div onClick={handleToggle}>
                        <Sun className={classes.sunIcon}/>
                    </div>
                }
            </div>
        </>
    );
};
