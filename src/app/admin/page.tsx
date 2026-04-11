"use client";

import { useState, useEffect, useCallback } from "react";

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  ingredients: string;
  preparation: string;
  active: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    price: "",
    ingredients: "",
    preparation: "",
    active: true,
  });

  const loadRecipes = useCallback(async () => {
    const res = await fetch("/api/admin/recipes", {
      headers: { Authorization: password },
    });
    if (res.ok) {
      const data = await res.json();
      setRecipes(data.recipes);
    }
  }, [password]);

  const handleLogin = async () => {
    const res = await fetch("/api/admin/recipes", {
      headers: { Authorization: password },
    });
    if (res.ok) {
      setAuthenticated(true);
      const data = await res.json();
      setRecipes(data.recipes);
    } else {
      setError("Senha incorreta");
    }
  };

  useEffect(() => {
    if (authenticated) loadRecipes();
  }, [authenticated, loadRecipes]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      price: "",
      ingredients: "",
      preparation: "",
      active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.title || !form.slug || !form.price) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      ...form,
      price: parseFloat(form.price),
      ingredients: JSON.stringify(
        form.ingredients.split("\n").filter((i) => i.trim())
      ),
      preparation: JSON.stringify(
        form.preparation.split("\n").filter((s) => s.trim())
      ),
    };

    const url = editingId
      ? `/api/admin/recipes/${editingId}`
      : "/api/admin/recipes";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: password,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      resetForm();
      loadRecipes();
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao salvar");
    }
  };

  const handleEdit = (recipe: Recipe) => {
    const ingredients = JSON.parse(recipe.ingredients) as string[];
    const preparation = JSON.parse(recipe.preparation) as string[];
    setForm({
      title: recipe.title,
      slug: recipe.slug,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      videoUrl: recipe.videoUrl,
      price: String(recipe.price),
      ingredients: ingredients.join("\n"),
      preparation: preparation.join("\n"),
      active: recipe.active,
    });
    setEditingId(recipe.id);
    setShowForm(true);
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/admin/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: password,
      },
      body: JSON.stringify({ active: !active }),
    });
    loadRecipes();
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-rose-100 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🔐 Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Senha de administrador"
            className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-center mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-full transition cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-rose-700">
          Gerenciar Receitas
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-full transition cursor-pointer"
        >
          {showForm ? "Cancelar" : "+ Nova Receita"}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-rose-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? "Editar Receita" : "Nova Receita"}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Descrição
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  URL da Imagem *
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  URL do Vídeo (embed)
                </label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm({ ...form, videoUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/embed/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="9.90"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Ingredientes (um por linha)
              </label>
              <textarea
                value={form.ingredients}
                onChange={(e) =>
                  setForm({ ...form, ingredients: e.target.value })
                }
                rows={5}
                placeholder="2 xícaras de farinha de trigo&#10;1 xícara de açúcar&#10;3 ovos"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Modo de Preparo (um passo por linha)
              </label>
              <textarea
                value={form.preparation}
                onChange={(e) =>
                  setForm({ ...form, preparation: e.target.value })
                }
                rows={5}
                placeholder="Pré-aqueça o forno a 180°C&#10;Misture os ingredientes secos&#10;Adicione os ovos e misture bem"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
                id="active"
                className="accent-rose-600"
              />
              <label htmlFor="active" className="text-sm text-gray-600">
                Receita ativa (visível no site)
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition cursor-pointer"
            >
              {editingId ? "Salvar Alterações" : "Criar Receita"}
            </button>
          </div>
        </div>
      )}

      {/* Lista de Receitas */}
      <div className="space-y-4">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Nenhuma receita cadastrada ainda.
          </p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-sm border border-rose-100 p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-gray-800">
                  {recipe.title}
                  {!recipe.active && (
                    <span className="ml-2 text-xs text-gray-400">
                      (inativa)
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">
                  /{recipe.slug} • R${" "}
                  {recipe.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="text-sm text-rose-600 hover:underline cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    handleToggleActive(recipe.id, recipe.active)
                  }
                  className="text-sm text-gray-500 hover:underline cursor-pointer"
                >
                  {recipe.active ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
