export const toBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string | null);
    reader.onerror = () => reject(null);
    reader.readAsDataURL(file);
  });
};