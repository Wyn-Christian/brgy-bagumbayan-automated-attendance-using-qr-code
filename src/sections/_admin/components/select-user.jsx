import { useMemo, useState, useTransition } from 'react';

import { searchUser } from 'src/actions/admin/user';

import { Field } from 'src/components/hook-form';

export default function SelectUser({ initialValues }) {
  const defaultOption = useMemo(
    () =>
      initialValues
        ? [
            {
              id: initialValues?.user?.id,
              full_name: initialValues?.user?.full_name,
            },
          ]
        : [],
    [initialValues]
  );

  const [options, setOptions] = useState(defaultOption);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <Field.Autocomplete
      name="user"
      label="User"
      placeholder="Select user..."
      options={options}
      loading={isPending}
      disabled={isPending && inputValue.length === 0}
      onInputChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setInputValue(newValue);
          startTransition(async () => {
            const result = await searchUser(inputValue);
            setOptions(result);
          });
        }
      }}
      getOptionLabel={(option) => option?.full_name ?? ''}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  );
}
