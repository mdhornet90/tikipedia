export default function mangledName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '');
}
