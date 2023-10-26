import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import styles from "./OptionSearchField.module.css";

interface ListItem {
  id: string;
  text: string;
}
interface OptionSearchFieldProps {
  list: ListItem[];
  onSelect: (id: string) => void;
}

export default function OptionSearchField({
  list,
  onSelect,
}: OptionSearchFieldProps) {
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState<ListItem[]>([]);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    if (searching) {
      inputRef?.current?.focus();
    }
  }, [searching]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setFilteredList(list.filter(({ text }) => text.includes(searchTerm)));
    } else {
      setFilteredList([]);
    }
  }, [searchTerm, list]);

  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        onClick={() => {
          if (!searching) {
            setSearching(true);
          }
        }}
      >
        <SearchIcon
          className={`${styles.searchIcon} ${
            searching ? styles.searching : ""
          }`}
        />
        {searching ? (
          <input
            ref={inputRef}
            className={styles.input}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setSearching(false)}
          />
        ) : (
          <div className={styles.displayedText}>{selectedText}</div>
        )}
      </div>
      {filteredList.length > 0 && (
        <div className={styles.options}>
          {filteredList.map(({ id, text }) => (
            <SearchOption
              key={id}
              text={text}
              matchingText={searchTerm}
              onSelect={() => {
                setSelectedText(text);
                setSearchTerm("");
                onSelect(id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SearchOptionProps {
  text: string;
  matchingText: string;
  onSelect: () => void;
}

function SearchOption({ text, matchingText, onSelect }: SearchOptionProps) {
  const start = text.indexOf(matchingText);
  if (start < 0) {
    return <div className={styles.searchOption}>{text}</div>;
  }

  const last = start + matchingText.length;

  const before = text.substring(0, start);
  const after = text.substring(last);

  return (
    <div className={styles.searchOption} onClick={onSelect}>
      <span>{before}</span>
      <span className={styles.match}>{matchingText}</span>
      <span>{after}</span>
    </div>
  );
}
