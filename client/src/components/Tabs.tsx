import { Tab } from '../types';

interface TabsProps {
  tabs: Tab[];
  activeTab: Tab | null;
  onChange?(tab: Tab): void;
}

const Tabs = ({ tabs = [], activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex">
      {tabs.map((t, index) => (
        <button
          key={index}
          className={`text-sm font-semibold p-3 flex-1 border border-primary ${
            t === activeTab ? 'bg-primary' : ''
          }`}
          onClick={() => onChange && onChange(t)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
