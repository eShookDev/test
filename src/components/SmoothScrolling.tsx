"use client";
import store from "@/redux/store";
import { ReactLenis } from "@studio-freight/react-lenis";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

interface Props extends PropsWithChildren { }

const SmoothScrolling = ({ children }: Props) => {

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <Provider store={store}>
                {children}
            </Provider>
        </ReactLenis>
    )
}

export default SmoothScrolling;