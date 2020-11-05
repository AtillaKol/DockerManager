package ch.dockermanager.backend.configuration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Component
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new Interceptor());
    }

    public static class Interceptor extends HandlerInterceptorAdapter {

        private final Logger LOGGER = LogManager.getLogger(Interceptor.class);

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            request.setAttribute("startTime", System.currentTimeMillis() % 1000);
            request.setAttribute("uuid", UUID.randomUUID());
            return true;
        }

        @Override
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
            LOGGER.info("Request ({}) took {} ms. Requested to {}", request.getAttribute("uuid"), (System.currentTimeMillis() % 1000 - (Long) request.getAttribute("startTime")), request.getRequestURI());
        }
    }
}
