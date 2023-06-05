import { FormControl, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, infer as zodInfer, number, object, string, date } from 'zod';
import { NumbersOrder } from '../../context/RecentOrder/types';
import { useTypedDispatch, useTypedSelector } from '../../context/store';
import { updateRecentToCustomer } from '../../context/Customer/helpers/updateMarker';
import { recentOrderActions } from '../../context/RecentOrder/recentOrderActions';
import Text from '../Text';
import Button from '../Button';
import { parseInt } from 'lodash';



function RecentOrderForm() {
  const { settings } = useTypedSelector(state => state.layout);

  const { ledgerMode } = settings;

  const createOrderRecentScheme: ZodType<NumbersOrder> = object({
    id: string(),
    number: string({ required_error: "number is required" }).min(parseInt(ledgerMode, 10)).max(parseInt(ledgerMode, 10)),
    amount: number({ required_error: "amount is required" }).min(100, { message: "amount must be bigger than 100" }),
    createdAt: date(),
    updatedAt: date(),
  });

  type CreateOrderRecentInput = zodInfer<typeof createOrderRecentScheme>;

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

  const onUpdateCustomerRecent = updateRecentToCustomer(dispatch);

  const { formState: {errors} } = method;

  const disabledForm = customerMarker === undefined;

  const onSubmit: SubmitHandler<CreateOrderRecentInput> = (value) => {
    if (!customerMarker) throw new Error("Please Chosse marker first")
    dispatch(recentOrderActions.createRecentOrder([value]));
    onUpdateCustomerRecent(customerMarker, value);
  }

  return (
    <VStack>
      <FormControl as="form" onSubmit={method.handleSubmit(onSubmit)}>
        <Input type="number" {...method.register("number")} placeholder='Number' />
        {errors.number && <Text color="red" text={errors.number?.message} />}
        <Input {...method.register("amount", { valueAsNumber: true })} placeholder='Amount' />
        {errors.amount && <Text color="red" text={errors.amount?.message} />}

        <Button type="submit" isDisabled={disabledForm} tx="common.save" />
        <Button type="button" onClick={() => method.reset()} tx="common.cancel" />

        <Button type="button" onClick={() => console.log(customerMarker)} text="log" />
      </FormControl>
    </VStack>
  )
}

export default RecentOrderForm;
