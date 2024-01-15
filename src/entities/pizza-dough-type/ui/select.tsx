import { PizzaDoughType } from '@prisma/client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

type LocalPizzaDoughType = Pick<PizzaDoughType, 'id' | 'title'>;

interface DoughTypeSelectProps {
  placeholder: string;
  items: LocalPizzaDoughType[];
  value?: LocalPizzaDoughType;
  onChange?(value?: LocalPizzaDoughType): void;
}

export function DoughTypeSelect({ items, placeholder, value, onChange }: DoughTypeSelectProps) {
  function setDoughType(doughTypeId: string) {
    onChange?.(items.find(doughType => doughType.id === doughTypeId));
  }

  return (
    <Select value={value?.id} onValueChange={setDoughType}>
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
