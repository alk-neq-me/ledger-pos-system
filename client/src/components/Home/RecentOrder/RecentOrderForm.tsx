import { Button, FormControl, Input, VStack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, infer as zodInfer, number, object, string, date } from 'zod';
import { NumbersOrder } from '../../../context/RecentOrder/types';
import { useTypedDispatch, useTypedSelector } from '../../../context/store';
import { recentOrderActions } from '../../../context/RecentOrder/recentOrderActions';


const LEDGER_MODE: "2" | "3" = "2";


const createOrderRecentScheme: ZodType<NumbersOrder> = object({
  id: string(),
  number: string({ required_error: "number is required" }).min(2).max(parseInt(LEDGER_MODE, 10)),
  amount: number({ required_error: "amount is required" }).min(100, { message: "amount must be bigger than 100" }),
  createdAt: date(),
  updatedAt: date(),
});

type CreateOrderRecentInput = zodInfer<typeof createOrderRecentScheme>;


function RecentOrder() {
  const method = useForm<CreateOrderRecentInput>({
    resolver: zodResolver(createOrderRecentScheme),
    defaultValues: {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

  const { customerMarker } = useTypedSelector(state => state.marker);
  const dispatch = useTypedDispatch();

  const { formState: {errors} } = method;

  const disabledForm = customerMarker === undefined;

  const onSubmit: SubmitHandler<CreateOrderRecentInput> = (value) => {
    console.log(value)
    dispatch(recentOrderActions.createRecentOrder([value]));
  }

  return (
    <VStack>
      <FormControl as="form" onSubmit={method.handleSubmit(onSubmit)}>
        <Input type="number" {...method.register("number")} placeholder='Number' />
        {errors.number && <Text color="red">{errors.number?.message}</Text>}
        <Input {...method.register("amount", { valueAsNumber: true })} placeholder='Amount' />
        {errors.amount && <Text color="red">{errors.amount?.message}</Text>}

        <Button type="submit" isDisabled={disabledForm}>Save</Button>
        <Button type="button" onClick={() => method.reset()}>Cancel</Button>
      </FormControl>
    </VStack>
  )
}

export default RecentOrder;
