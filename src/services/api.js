import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

// Interceptor: injeta token automaticamente se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── PRODUTOS ───────────────────────────────────────────────────────────────

export const getProdutos = (params = {}) =>
  api.get("/products", { params }).then((r) => r.data);

export const getProdutoPorId = (id) =>
  api.get(`/products/${id}`).then((r) => r.data);

export const criarProduto = (data) =>
  api.post("/products", data).then((r) => r.data);

export const atualizarProduto = (id, data) =>
  api.put(`/products/${id}`, data).then((r) => r.data);

export const deletarProduto = (id) =>
  api.delete(`/products/${id}`).then((r) => r.data);

export const uploadImagemProduto = (file) => {
  const form = new FormData();
  form.append("image", file);
  return api.post("/products/upload/image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
};

// ─── CATEGORIAS ─────────────────────────────────────────────────────────────

export const getCategorias = () =>
  api.get("/categories").then((r) => r.data);

export const getCatPorId = (id) =>
  api.get(`/categories/${id}`).then((r) => r.data);

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const register = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then((r) => r.data);

// ─── CARRINHO ────────────────────────────────────────────────────────────────

export const getCarrinho = () =>
  api.get("/cart").then((r) => r.data);

export const adicionarAoCarrinho = (productId, quantity = 1) =>
  api.post("/cart", { productId, quantity }).then((r) => r.data);

// ─── PEDIDOS ─────────────────────────────────────────────────────────────────

export const criarPedido = () =>
  api.post("/orders").then((r) => r.data);

export const getMeusPedidos = () =>
  api.get("/orders").then((r) => r.data);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export const imagemUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:3000${path}`;
};

export default api;