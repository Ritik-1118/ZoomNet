import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/signin"],
    afterAuth(auth, req, evt) {
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/") {
            const orgSelection = new URL("/", req.url);
            return NextResponse.redirect(orgSelection);
        }
        return NextResponse.next();
    },
});
export const config = {
    matcher: ["/((?!static|.\\..|_next|favicon.ico).*)", "/"],
};