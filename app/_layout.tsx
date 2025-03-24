// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Las pantallas se resuelven automáticamente por nombre: index, login, menu, etc. */}
    </Stack>
  );
}
