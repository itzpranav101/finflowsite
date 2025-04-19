
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText, Video, Headphones, Link, Star } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "book" | "podcast" | "tool" | "course";
  difficulty?: "beginner" | "intermediate" | "advanced";
}

interface ResourcesPanelProps {
  ageGroup: string;
  resources: Resource[];
}

const ResourcesPanel = ({ ageGroup, resources }: ResourcesPanelProps) => {
  // Group resources by type
  const groupedResources = resources.reduce<Record<string, Resource[]>>(
    (acc, resource) => {
      if (!acc[resource.type]) {
        acc[resource.type] = [];
      }
      acc[resource.type].push(resource);
      return acc;
    },
    {}
  );

  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="text-blue-500" />;
      case "video":
        return <Video className="text-red-500" />;
      case "book":
        return <BookOpen className="text-purple-500" />;
      case "podcast":
        return <Headphones className="text-green-500" />;
      case "tool":
        return <Link className="text-amber-500" />;
      case "course":
        return <Star className="text-teal-500" />;
      default:
        return <ExternalLink className="text-slate-500" />;
    }
  };

  // Get CSS class for difficulty level
  const getDifficultyClass = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Finance Resources for {ageGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          These curated resources will help you deepen your knowledge and develop practical financial skills.
        </p>
      </div>

      {Object.entries(groupedResources).map(([type, typeResources], typeIndex) => (
        <Card key={type} className="overflow-hidden">
          <CardHeader className={`bg-slate-50 border-b`}>
            <CardTitle className="capitalize flex items-center">
              {getResourceIcon(type)}
              <span className="ml-2">{type}s</span>
            </CardTitle>
            <CardDescription>
              {type === "article" && "In-depth articles and guides to expand your knowledge"}
              {type === "video" && "Visual learning resources and tutorials"}
              {type === "book" && "Comprehensive books on finance topics"}
              {type === "podcast" && "Audio content you can listen to on the go"}
              {type === "tool" && "Interactive tools and calculators"}
              {type === "course" && "Structured learning programs and courses"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {typeResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-blue-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-blue-600">{resource.title}</h3>
                        <ExternalLink className="ml-2 h-3 w-3 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
                    </div>
                    {resource.difficulty && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyClass(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourcesPanel;
