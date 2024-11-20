import { createServerClient } from '@supabase/ssr';

export async function updateSession(request) {
  let supabaseResponse = {
    next: function() {
      return {
        request: request,
        cookies: {
          getAll: function() {
            return request.cookies.getAll();
          },
          set: function(name, value, options) {
            request.cookies.set(name, value);
            supabaseResponse = {
              next: function() {
                return {
                  request: request,
                  cookies: {
                    set: function(name, value, options) {
                      // Set cookie logic here
                    },
                    getAll: function() {
                      return supabaseResponse.cookies.getAll();
                    }
                  }
                };
              }
            };
            supabaseResponse.cookies.set(name, value, options);
          }
        }
      };
    }
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: function() {
          return request.cookies.getAll();
        },
        setAll: function(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = {
            next: function() {
              return {
                request: request,
                cookies: {
                  set: function(name, value, options) {
                    // Set cookie logic here
                  },
                  getAll: function() {
                    return supabaseResponse.cookies.getAll();
                  }
                }
              };
            }
          };
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = new URL(request.nextUrl);
    url.pathname = '/login';
    return {
      redirect: function(url) {
        return url;
      }
    };
  }

  return supabaseResponse;
}

