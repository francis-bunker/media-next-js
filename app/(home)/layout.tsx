"use client"
import store from "./store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import Session from "./Session";
import TOC from "./menu";
export default function layout({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <Session>
                <div>
                    <div className="d-flex justify-content-center p-3 border-bottom">
                        {<TOC />}
                    </div>
                    <div >
                        {children}

                    </div>
                </div>
            </Session>
        </Provider>
    );
}