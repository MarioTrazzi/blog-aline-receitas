// src/components/RecipeImage.tsx
// Imagem da receita com fallback para placeholder decorativo
// se imageUrl estiver vazio ou for um URL inválido.

import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  aspect?: "4/5" | "4/3" | "1/1" | "16/9";
  sizes?: string;
  priority?: boolean;
};

export function RecipeImage({
  src,
  alt,
  label,
  className = "",
  aspect = "4/5",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: Props) {
  const aspectClass = {
    "4/5": "aspect-[4/5]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "16/9": "aspect-video",
  }[aspect];

  if (!src) {
    return (
      <div
        className={`ph-food ${aspectClass} w-full ${className}`}
        data-label={label ?? alt}
      />
    );
  }

  return (
    <div className={`relative ${aspectClass} w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
