//package Midam.Filter;
//
//
//
//import javax.servlet.*;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class CorsFilter implements Filter {
//
//    public void init(FilterConfig filterConfig) throws ServletException {}
//
//    public void destroy() {}
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
//        httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//        chain.doFilter(request,response);
//    }
//}
