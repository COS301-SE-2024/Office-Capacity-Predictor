// MockBackend.ts

export const mockRegisterCredential = async () => {
  // Simulate fetching credential creation options from the backend
  const credentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from("random-challenge-string", (c) =>
      c.charCodeAt(0)
    ),
    rp: { name: "Occupi", id: "localhost" },
    user: {
      id: Uint8Array.from("unique-user-id", (c) => c.charCodeAt(0)),
      name: "Tina@gmail.com",
      displayName: "User Example",
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 }, // ES256
      { type: "public-key", alg: -257 }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      residentKey: "required",
    },
    extensions: {
      credProps: true,
    },
    timeout: 60000,
    attestation: "none",
  };
  return credentialCreationOptions;
};

export const mockAuthenticateWithCredential = async () => {
  // Simulate fetching credential request options from the backend
  const credentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: Uint8Array.from("random-challenge-string", (c) =>
      c.charCodeAt(0)
    ),
    rpId: "localhost",
    userVerification: "preferred",
    timeout: 60000,
  };
  console.log("credentialRequestOptions:", credentialRequestOptions);
  return credentialRequestOptions;
};
