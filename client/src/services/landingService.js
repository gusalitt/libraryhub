import api from "@/services/axios";

export const fetchLanding = async () => await api.get("/landing");

export const fetchBooks = async () => await api.get("/landing/books");

export const fetchCategories = async () => await api.get("/landing/categories");

export const fetchCoreStats = async () => await api.get("/landing/about");