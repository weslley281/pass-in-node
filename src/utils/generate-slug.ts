// Importa o módulo `remove-accents` para remover acentos, se necessário
import removeAccents from 'remove-accents';

// Função para criar um slug a partir de uma string
export function createSlug(input: string): string {
  // Converte para minúsculas
  let slug = input.toLowerCase();

  // Remove acentos
  slug = removeAccents(slug);

  // Substitui espaços por hífens
  slug = slug.replace(/\s+/g, '-');

  // Remove todos os caracteres não alfanuméricos, exceto hífens
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Remove hífens no início ou fim
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}
