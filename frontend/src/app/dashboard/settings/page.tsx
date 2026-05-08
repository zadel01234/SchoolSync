"use client";

import { motion } from "framer-motion";
import { School, Upload, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function SettingsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage your school profile and system preferences</p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><School className="h-5 w-5" />School Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                <School className="h-8 w-8" />
              </div>
              <div>
                <Button variant="outline" size="sm" leftIcon={<Upload className="h-4 w-4" />}>Upload Logo</Button>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="School Name" defaultValue="Greenfield Academy" />
              <Input label="Email" type="email" defaultValue="admin@greenfield.edu.ng" />
              <Input label="Phone Number" defaultValue="+234 801 234 5678" />
              <Input label="Address" defaultValue="12 Education Lane, Lagos" />
              <Input label="Current Session" defaultValue="2025/2026" />
              <Input label="Current Term" defaultValue="First Term" />
            </div>
            <div className="flex justify-end pt-4">
              <Button leftIcon={<Save className="h-4 w-4" />}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
