import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomModal } from "../../components/modal/custom-modal";
import { usePartnerModal } from "../store/partnerModal";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useApiMutation } from "../../hooks/useApiMutation";
import { endpoints } from "../../api/endpoints";
import { appToast } from "../../utils/toast";

type PartnerForm = {
  name: string;
  email: string;
  description?: string;
};

export function PartnerWithUsModal() {
  const { isOpen, setOpen, draft, setDraft, clearDraft } = usePartnerModal();

  const { mutate } = useApiMutation<any, any>({
    route: endpoints.postEnquiry,
    method: "POST",
    onSuccess: () => {
      appToast.success("Submission successful! We'll be in touch soon.");
      onClose();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<PartnerForm>({
    defaultValues: draft,
    mode: "onBlur",
  });

  // Persist draft as user types
  const w = watch();
  useEffect(() => {
    setDraft(w);
  }, [w.name, w.email, w.description]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: PartnerForm) => {
    console.log("[Partner Modal] submit:", data);
    mutate({
      email: data.email,
      name: data.name,
      ...(data.description ? { message: data.description } : {}),
    });
    clearDraft();
    reset({ name: "", email: "", description: "" });
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Us"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Submit"
      submitButtonClass="bg-[#0264FF] rounded-full"
      needX
      isSubmitting={isSubmitting}
      contentContainerClass="w-full bg-white/90"
    >
      <form
        onSubmit={(e) => e.preventDefault()} // let the modal's Submit trigger RHF
        className="space-y-5 pt-2"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-[#0264FF]">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-[#0264FF]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-[#0264FF]">
            Description (optional)
          </Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Briefly describe your goals or partnership idea"
            {...register("description")}
          />
        </div>
      </form>
    </CustomModal>
  );
}
