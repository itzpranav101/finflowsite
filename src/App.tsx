
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Simulator from "./pages/Simulator";
import Portfolio from "./pages/Portfolio";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
import AssessmentIntro from "./components/AssessmentIntro";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/finance/:ageGroup" element={<Finance />} />
          <Route path="/finance/:ageGroup/assessment-intro" element={<AssessmentIntro />} />
          <Route path="/finance/:ageGroup/learning" element={<Finance />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/learn" element={<Learn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
