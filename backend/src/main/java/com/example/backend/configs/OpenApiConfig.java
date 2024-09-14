package com.example.backend.configs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Azzedine Baka",
                        email = "azedine.baka@univ-constantine2.dz"
                ),
                description = "OpenApi docs for Employee Manager.",
                title = "OpenApi specification-Employee-Manager",
                version = "1.0"
        )
)
public class OpenApiConfig {
}
