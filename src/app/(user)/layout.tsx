import {ReactNode} from "react";

export default function UserLayout({children}: { children: ReactNode }) {
    return (
        <div>
            UserLayout
            {children}
        </div>
    )
}