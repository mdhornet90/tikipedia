export function mangledName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '');
}

export function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-]/, '');
}
