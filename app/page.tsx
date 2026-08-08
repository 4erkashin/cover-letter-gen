import { View } from "reshaped";

import { Dashboard } from "@/features/dashboard";

export default function DashboardPage() {
  return (
    <Dashboard.Root>
      <View gap={12}>
        <View gap={6}>
          <Dashboard.Header />

          <Dashboard.List />
        </View>

        <pre>banner</pre>
      </View>
    </Dashboard.Root>
  );
}
