package com.notifyservice;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/** Decoded NotifyService delegated-token payload. */
@JsonIgnoreProperties(ignoreUnknown = true)
public final class TokenPayload {
    public final String iss;
    public final String sub;
    public final String scope;
    public final long iat;
    public final long exp;

    @JsonCreator
    public TokenPayload(
            @JsonProperty("iss") String iss,
            @JsonProperty("sub") String sub,
            @JsonProperty("scope") String scope,
            @JsonProperty("iat") long iat,
            @JsonProperty("exp") long exp) {
        this.iss = iss;
        this.sub = sub;
        this.scope = scope;
        this.iat = iat;
        this.exp = exp;
    }
}
