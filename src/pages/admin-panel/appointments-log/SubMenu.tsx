import {SubMenuStyle, ProviderButton} from "./AppointmentsLogStyle";

interface SubMenuProps {
    initialServiceProviders: any;
    selectedProviderId: string | null;
    setSelectedProviderId: (id: string | null) => void;
}

const SubMenu = ({
                     initialServiceProviders,
                     selectedProviderId,
                     setSelectedProviderId
                 }: SubMenuProps) => {
    const handleProviderClick = (id: string | null) => {
        setSelectedProviderId(id);
    };

    return (
        <SubMenuStyle>
            <ProviderButton
                variant={selectedProviderId === null ? 'contained' : 'text'}
                isActiveProvider={selectedProviderId === null}
                onClick={() => handleProviderClick(null)}>כולם</ProviderButton>

            {initialServiceProviders?.map((provider: any) => {
                return (
                    <ProviderButton
                        isActiveProvider={provider._id === selectedProviderId}
                        onClick={() => handleProviderClick(provider._id)}
                        variant={provider._id === selectedProviderId ? 'contained' : 'text'}
                        key={provider._id}>{provider.fullName}</ProviderButton>
                )
            })}
        </SubMenuStyle>
    );
};

export default SubMenu;