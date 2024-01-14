import { PizzaTag } from '@prisma/client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

type LocalPizzaTag = Pick<PizzaTag, 'id' | 'title'>;

interface TagSelectProps {
  placeholder: string;
  items: LocalPizzaTag[];
  value?: LocalPizzaTag;
  onChange?(value?: LocalPizzaTag): void;
}

export function TagSelect({ items, placeholder, value, onChange }: TagSelectProps) {
  function setTag(tagId: string) {
    onChange?.(items.find(tag => tag.id === tagId));
  }

  return (
    <Select value={value?.id} onValueChange={setTag}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ id, title }) => (
          <SelectItem key={id} value={id}>
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
