"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import DatePicker from "react-datepicker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import "react-datepicker/dist/react-datepicker.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "./formValidation";

const ProjectForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const TDL = watch("totalDeposit", 0);
  const ratio = watch("ratioToBuilders", 0);

  const getDeployFee = () => {
    return Number.isNaN(Math.max(20, TDL * ratio * 0.01))? 20 : Math.max(20, TDL * ratio * 0.01);
  };

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="flex items-center">
        <span className="mr-2 w-1/3">Name:</span>
        <div className="w-2/3">
          <Input
            {...register("name")}
            placeholder="Name"
            onBlur={() => trigger("name")}
          />
        </div>
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">TDL:</span>
        <div className="flex items-center w-2/3">
          <Input
            {...register("totalDeposit", {
              required: "Total Deposit Value is required",
              valueAsNumber: true,
            })}
            placeholder="Total Deposit Value"
            onBlur={() => trigger("totalDeposit")}
          />
          <span className="text-cyan-400 ml-2">SUI</span>
        </div>
      </div>
      {errors.totalDeposit && (
        <p className="text-red-500">{errors.totalDeposit.message}</p>
      )}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">Ratio:</span>
        <div className="w-2/3">
          <Input
            {...register("ratioToBuilders", {
              valueAsNumber: true,
            })}
            placeholder="TDL * Ratio = CrowdFund for Builders"
            onBlur={() => trigger("ratioToBuilders")}
          />
        </div>
      </div>
      {errors.ratioToBuilders && (
        <p className="text-red-500">{errors.ratioToBuilders.message}</p>
      )}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">Min Value:</span>
        <div className="w-2/3 flex items-center">
          <Input
            {...register("minValue", {
              valueAsNumber: true,
            })}
            placeholder="Min Value"
            onBlur={() => trigger("minValue")}
          />
          <span className="text-cyan-400 ml-2">SUI</span>
        </div>
      </div>
      {errors.minValue && (
        <p className="text-red-500">{errors.minValue.message}</p>
      )}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">Max Value:</span>
        <div className="w-2/3 flex items-center">
          <Input
            {...register("maxValue", {
              valueAsNumber: true,
            })}
            placeholder="Max Value"
            onBlur={() => trigger("maxValue")}
          />
          <span className="text-cyan-400 ml-2">SUI</span>
        </div>
      </div>
      {errors.maxValue && (
        <p className="text-red-500">{errors.maxValue.message}</p>
      )}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">Start Time:</span>
        <div className="w-2/3">
          <Controller
            control={control}
            name="startTime"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => {
                  field.onChange(date);
                  trigger("startTime");
                }}
                showTimeSelect
                dateFormat="Pp"
                className="min-full bg-primary-foreground border rounded px-3 py-2"
              />
            )}
          />
        </div>
      </div>
      {errors.startTime && (
        <p className="text-red-500">{errors.startTime.message}</p>
      )}

      <div className="flex items-center">
        <span className="mr-2 w-1/3">Duration:</span>
        <div className="w-2/3">
          <Input
            {...register("projectDuration", {
              valueAsNumber: true,
            })}
            placeholder="Development Time (days)"
            onBlur={() => trigger("projectDuration")}
          />
        </div>
      </div>
      {errors.projectDuration && (
        <p className="text-red-500">{errors.projectDuration.message}</p>
      )}

      <div className="flex">
        <span className="mr-2 w-1/3">Description:</span>
        <div className="w-2/3">
          <Textarea
            {...register("description")}
            placeholder="Description"
            rows={3}
            onBlur={() => trigger("description")}
          />
        </div>
      </div>
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="Optional">
          <AccordionTrigger>Some more options ?</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center">
              <span className="mr-2 w-1/3">Image URL:</span>
              <div className="w-2/3">
                <Input
                  {...register("imageUrl")}
                  placeholder="Image URL (Optional)"
                />
                {errors.imageUrl && (
                  <p className="text-red-500">{errors.imageUrl.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="mr-2 w-1/3">X Link:</span>
              <div className="w-2/3">
                <Input {...register("xLink")} placeholder="X Link (Optional)" />
                {errors.xLink && (
                  <p className="text-red-500">{errors.xLink.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="mr-2 w-1/3">Telegram Link:</span>
              <div className="w-2/3">
                <Input
                  {...register("telegramLink")}
                  placeholder="Telegram Link (Optional)"
                />
                {errors.telegramLink && (
                  <p className="text-red-500">{errors.telegramLink.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="mr-2 w-1/3">Website:</span>
              <div className="w-2/3">
                <Input
                  {...register("website")}
                  placeholder="Website (Optional)"
                />
                {errors.website && (
                  <p className="text-red-500">{errors.website.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="mr-2 w-1/3">Github:</span>
              <div className="w-2/3">
                <Input
                  {...register("github")}
                  type="url"
                  placeholder="Github (Optional)"
                />
                {errors.github && (
                  <p className="text-red-500">{errors.github.message}</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="min-w-full" type="submit" disabled={isSubmitting}>
        Create Project
      </Button>

      <p className="text-cyan-400">Deploy Fee: {getDeployFee()} SUI</p>
    </form>
  );
};

export default ProjectForm;
