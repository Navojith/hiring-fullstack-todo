export type PREFIX = (typeof PREFIX)[keyof typeof PREFIX];

export type PrefixedUUID = `${string}-${string}`;

export type DialogType = 'EDIT' | 'ADD' | undefined;

type TodoFormValues = CreateTodoDto & { done?: boolean };
