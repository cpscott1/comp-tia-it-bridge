
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChecklistItem as ChecklistItemType } from "@/data/jobReadinessData";
import { getCategoryColor, getPriorityColor } from "@/utils/jobReadinessUtils";

interface ChecklistItemProps {
  item: ChecklistItemType;
  isCompleted: boolean;
  onToggle: (itemId: string) => void;
}

const ChecklistItem = ({ item, isCompleted, onToggle }: ChecklistItemProps) => {
  return (
    <Card className={`${
      isCompleted ? 'bg-green-50 border-green-200' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggle(item.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${
                isCompleted ? 'line-through text-gray-600' : ''
              }`}>
                {item.title}
              </h3>
              <div className="flex space-x-2">
                <Badge className={getCategoryColor(item.category)}>
                  {item.category}
                </Badge>
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
              </div>
            </div>
            <p className={`text-gray-600 mb-2 ${
              isCompleted ? 'line-through' : ''
            }`}>
              {item.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Estimated time: {item.estimatedTime}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {item.phase}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistItem;
