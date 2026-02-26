package finaceiro.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desliga a proteção CSRF (necessário para APIs REST deixarem o POST funcionar)
                .csrf(csrf -> csrf.disable())

                // 2. Libera o CORS (Isso vai salvar a sua vida quando formos plugar o React depois!)
                .cors(Customizer.withDefaults())

                // 3. Exige autenticação para QUALQUER requisição
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )

                // 4. Diz que a forma de autenticação é o Basic Auth (aquele usuário e senha do properties)
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

}
