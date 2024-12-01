import ErrorToast from '@/components/ui/toast/custom/ErrorToast.vue';
import NormalToast from '@/components/ui/toast/custom/NormalToast.vue';
import SuccessToast from '@/components/ui/toast/custom/SuccessToast.vue';
import WarningToast from '@/components/ui/toast/custom/WarningToast.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { h } from 'vue';

const { toast } = useToast();

export const errorToast = (message: string) => {
	toast({
		variant: 'destructive',
		action: h(ErrorToast, { message }),
	});
};

export const successToast = (message: string) => {
	toast({
		variant: 'success',
		action: h(SuccessToast, { message }),
	});
};

export const normalToast = (message: string) => {
	toast({
		variant: 'default',
		action: h(NormalToast, { message }),
	});
};

export const warningToast = (message: string) => {
	toast({
		variant: 'warning',
		action: h(WarningToast, { message }),
	});
};
