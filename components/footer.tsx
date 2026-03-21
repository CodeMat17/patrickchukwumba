export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.15 82), oklch(0.62 0.18 65))",
            }}
          >
            PC
          </div>
          <span className="text-sm font-medium text-foreground">Patrick Chukwumba Okorie</span>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Supply Chain Category Manager · Nigerian Breweries Plc · Lagos, Nigeria
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  )
}
