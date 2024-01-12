'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { LoginSchema } from '../schemas';
import { login } from '../server-actions';
import { LoginValues } from '../types';

export function FormCard() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const { handleSubmit } = form;

  async function onSubmit(values: LoginValues) {
    startTransition(async () => {
      await login(values).then(response => {
        toast[response.type](response.message);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-[360px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Войти</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isPending}>
              Войти
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
