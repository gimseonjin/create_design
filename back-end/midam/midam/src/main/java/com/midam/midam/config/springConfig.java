package com.midam.midam.config;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@EnableWebSecurity
public class springConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
            http.csrf().disable().authorizeRequests()
                    .antMatchers("/").permitAll().and().logout().permitAll().and()
                    .formLogin().loginPage("/login").defaultSuccessUrl("/mentor");
            //...
        }
      /*
        http.authorizeRequests()
                .antMatchers("/adminOnly").hasAuthority("ROLE_ADMIN")
                .antMatchers("/**").permitAll()  // 넓은 범위의 URL을 아래에 배치한다.
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").failureUrl("/login?error").permitAll()
                .defaultSuccessUrl("/")
                .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));

        // 로그아웃 기본 url은 (/logout)
        // 새로 설정하려면 .logoutUrl("url")*/


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password(passwordEncoder().encode("1234")).roles("ADMIN")
                .and()
                .withUser("guest").password(passwordEncoder().encode("guest")).roles("GUEST");
    }

    // passwordEncoder() 추가
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}