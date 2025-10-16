import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { Input } from "../components/Input";
import { api } from "../utils/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirige automáticamente si ya hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigation.replace("Profile");
    }
  }, []);

  // Configuración de Google Auth solo para web
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "311591873765-e8ra3rm2an4grq3qcl1b4u41f80qkhi2.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  // Manejo de response global (web)
  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication.idToken || response.authentication.id_token;
      if (!token) return Alert.alert("Error", "No se obtuvo idToken de Google");

      api.post("/auth/google", { id_token: token })
        .then((res) => {
          if (!res.data.token) throw new Error("No se recibió token del backend");

          // Guardar token
          localStorage.setItem("token", res.data.token);

          // Forzar reload de la página para que React SPA detecte el token
          window.location.href = "/"; // vuelve a cargar la app y disparará navigation.replace en useEffect anterior
        })
        .catch((err) => {
          console.error(err);
          Alert.alert("Error", "Login con Google falló");
        });
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Completa todos los campos");

    try {
      const res = await api.post("/auth/login", { email, password });
      if (!res.data.token) throw new Error("No se recibió token del backend");

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Credenciales inválidas o servidor no responde");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate("Register")} />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Login con Google"
          onPress={() => promptAsync()}
          disabled={!request}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, textAlign: "center", marginBottom: 20 },
});
