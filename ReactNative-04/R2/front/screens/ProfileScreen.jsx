import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet } from "react-native";
import { api } from "../utils/api";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [scanPath, setScanPath] = useState(null); // ruta del escaneo
  const fileInputRef = useRef(null);

  const showAlert = (title, message) => {
    alert(`${title}: ${message}`);
  };

  // Obtener perfil
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("No autorizado", "Debes iniciar sesión");
        if (navigation?.replace) navigation.replace("Login");
        return;
      }

      const res = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);

      // Si hay documento escaneado previamente
      if (res.data.document_path) setScanPath(res.data.document_path);
    } catch (err) {
      console.error("Error obteniendo perfil:", err.response?.data || err.message);
      showAlert("Error", "No se pudo cargar el perfil");
    }
  };

  // Actualizar perfil
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/user/profile",
        {
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          photo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showAlert("Éxito", "Perfil actualizado");
      getProfile();
      setPhoto(null);
    } catch (err) {
      console.error("Error actualizando perfil:", err.response?.data || err.message);
      showAlert("Error", "No se pudo actualizar el perfil");
    }
  };

  // Escanear documento usando cámara (solo Web)
  const handleScan = async (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file, file.name);

    try {
      const res = await api.post("/upload/document", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      showAlert("Éxito", "Documento escaneado subido");
      setScanPath(res.data.path);
    } catch (err) {
      console.error("Error subiendo escaneo:", err);
      showAlert("Error", "No se pudo subir el escaneo");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <Image source={{ uri: profile.photo }} style={styles.photo} />
      )}

      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={(t) => setProfile({ ...profile, name: t })}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={profile.phone || ""}
        onChangeText={(t) => setProfile({ ...profile, phone: t })}
        placeholder="Teléfono"
      />
      <TextInput
        style={styles.input}
        value={profile.address || ""}
        onChangeText={(t) => setProfile({ ...profile, address: t })}
        placeholder="Dirección"
      />

      <Button title="Guardar cambios" onPress={updateProfile} />
      <View style={{ height: 10 }} />

      {/* Input oculto para escaneo */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleScan}
      />
      <Button title="Escanear Documento" onClick={() => fileInputRef.current.click()} />

      {/* Mostrar escaneo */}
      {scanPath && (
        <div style={{ marginTop: 20 }}>
          <Text>Documento escaneado:</Text>
          <img
            src={`http://localhost:3000/${scanPath}`}
            alt="Escaneo"
            style={{ width: "100%", maxHeight: 400, marginTop: 10 }}
          />
        </div>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
});
