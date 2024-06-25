import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import BookingDetails from "../BookingDetails";
import { NavigationContainer } from "@react-navigation/native";

// Mock @gluestack-ui/themed
jest.mock('@gluestack-ui/themed', () => ({
    useToast: jest.fn(),
    Toast: 'Toast',
    ToastTitle: 'ToastTitle',
    View: 'View',
    // Add any other components or hooks you're using from @gluestack-ui/themed
  }));
jest.mock('expo-local-authentication', () => ({
    hasHardwareAsync: jest.fn().mockResolvedValue(true),
    isEnrolledAsync: jest.fn().mockResolvedValue(true),
    authenticateAsync: jest.fn().mockResolvedValue({ success: true }),
  }));
  
  jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
  }));
  
  jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn().mockReturnValue({
      email: 'test@example.com',
      slot: '10',
      roomId: '1',
      floorNo: '3',
      roomData: JSON.stringify({
        roomName: 'Conference Room',
        minOccupancy: 1,
        maxOccupancy: 10,
        floorNo: 3,
      }),
    }),
  }));  
  
describe("BookingDetails Component", () => {
  it("renders correctly and matches snapshot", () => {
    const component = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("navigates back when back button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(useNavigation().goBack).toHaveBeenCalled();
  });

  it("adds an attendee when email is entered and add button is pressed", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText("Enter attendee's email or employee id");
    const addButton = getByTestId("add-attendee-button");

    fireEvent.changeText(emailInput, "attendee@example.com");
    fireEvent.press(addButton);

    expect(getByTestId("attendees-list").props.data).toContain("attendee@example.com");
  });

  it("removes an attendee when the remove button is pressed", () => {
    const { getByTestId, getByPlaceholderText, queryByText } = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText("Enter attendee's email or employee id");
    const addButton = getByTestId("add-attendee-button");

    fireEvent.changeText(emailInput, "attendee@example.com");
    fireEvent.press(addButton);

    const removeButton = queryByText("attendee@example.com").parent.querySelector('remove-button');
    fireEvent.press(removeButton);

    expect(queryByText("attendee@example.com")).toBeNull();
  });

  it("handles biometric authentication correctly", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );

    const confirmButton = getByTestId("confirm-booking-button");
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(getByTestId("step-indicator").children[1].props.style.backgroundColor).toBe("greenyellow");
    });
  });

  it("submits the booking form and displays the receipt", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <BookingDetails />
      </NavigationContainer>
    );

    const sendInvitesButton = getByTestId("send-invites-button");
    fireEvent.press(sendInvitesButton);

    await waitFor(() => {
      expect(getByTestId("step-indicator").children[2].props.style.backgroundColor).toBe("greenyellow");
      expect(getByTestId("receipt-details")).toBeTruthy();
    });
  });
});
