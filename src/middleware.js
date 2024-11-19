import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  `/`,              // Root route
  `/sign-in/[…sign-in]`, // Sign-in route
  `/sign-up/[…sign-up]`  // Sign-up route
]);

export default clerkMiddleware(async (auth, request) => {
  try {
    // If the route is not public, enforce authentication
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  } catch (error) {
    // Redirect unauthenticated users to sign-in page
    return Response.redirect('/sign-in/[...sign-in]');
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};