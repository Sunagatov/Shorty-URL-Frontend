package com.zufar.service;


import com.zufar.dto.OrderDTO;
import com.zufar.dto.CategoryDTO;
import com.zufar.dto.ClientInputDTO;
import com.zufar.dto.ClientDTO;
import com.zufar.dto.ClientTypeDTO;
import com.zufar.entity.Client;
import com.zufar.entity.ClientType;
import com.zufar.repository.ClientRepository;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class ClientServiceTest {

    @InjectMocks
    private ClientService clientService;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private OrderService orderService;

    @Mock
    private ClientTypeService clientTypeService;

    private static final Long clientId = 1L;
    private static final LocalDateTime dateTime = LocalDateTime.now();
    private static final ArrayList<Long> orderIds = new ArrayList<>();
    private static final List<Client> clients = new ArrayList<>();
    private static final List<OrderDTO> orders = new ArrayList<>();
    private static final ClientType clientType = new ClientType(clientId, "ShortName1", "FullName1", "ClientTypeCode1");
    private static final Client client = new Client(clientId, "ShortName1", "FullName1", clientType, "ClientTypeCode1", "ClientTypeCode1", orderIds, dateTime, dateTime);
    private static final ClientInputDTO clientInput = new ClientInputDTO(clientId, "ShortName1", "FullName1", clientType.getId(), "ClientTypeCode1", "ClientTypeCode1", orderIds, dateTime, dateTime);
    private static final List<ClientDTO> clientDTOs = new ArrayList<>();
    private static final ClientTypeDTO clientTypeDTO = new ClientTypeDTO(clientId, "ShortName1", "FullName1", "ClientTypeCode1");
    private static final ClientDTO clientDTO = new ClientDTO(clientId, "ShortName1", "FullName1", clientTypeDTO, "ClientTypeCode1", "ClientTypeCode1", orders, dateTime, dateTime);

    @BeforeClass
    public static void setUp() {
        clients.add(client);
        clientDTOs.add(clientDTO);
        orderIds.add(1L);
        CategoryDTO category = new CategoryDTO(1L, "categoryName1");
        OrderDTO order = new OrderDTO(1L, "goodsName1", category, clientId);
        orders.add(order);
    }

    @Test
    public void whenGetAllCalledThenListShouldBeReturned() {
        when(clientRepository.findAll()).thenReturn(clients);
        when(orderService.getOrdersByIds(orderIds)).thenReturn(new ResponseEntity<>(orders, HttpStatus.OK));

        List<ClientDTO> expected = clientDTOs;
        List<ClientDTO> actual = this.clientService.getAll();

        verify(clientRepository, times(1)).findAll();
        verify(orderService, times(1)).getOrdersByIds(orderIds);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    public void whenGetByCalledThenClientShouldBeReturned() {
        when(clientRepository.findById(clientId)).thenReturn(Optional.of(client));
        when(clientRepository.existsById(clientId)).thenReturn(true);
        when(orderService.getOrdersByIds(orderIds)).thenReturn(new ResponseEntity<>(orders, HttpStatus.OK));

        ClientDTO expected = clientDTO;
        ClientDTO actual = this.clientService.getById(clientId);

        verify(clientRepository, times(1)).findById(clientId);
        verify(clientRepository, times(1)).existsById(clientId);
        verify(orderService, times(1)).getOrdersByIds(orderIds);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    public void whenSaveCalledThenClient() {
        when(clientRepository.save(client)).thenReturn(client);
        when(clientTypeService.getById(clientId)).thenReturn(clientTypeDTO);
        when(orderService.getOrdersByIds(orderIds)).thenReturn(new ResponseEntity<>(orders, HttpStatus.OK));

        ClientDTO expected = clientDTO;
        ClientDTO actual = this.clientService.save(clientInput);

        verify(clientRepository, times(1)).save(client);
        verify(clientTypeService, times(1)).getById(clientId);
        verify(orderService, times(1)).getOrdersByIds(orderIds);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    public void whenUpdateCalledThenClient() {
        when(clientRepository.save(client)).thenReturn(client);
        when(clientTypeService.getById(clientId)).thenReturn(clientTypeDTO);
        when(clientRepository.existsById(clientId)).thenReturn(true);
        when(orderService.getOrdersByIds(orderIds)).thenReturn(new ResponseEntity<>(orders, HttpStatus.OK));

        ClientDTO expected = clientDTO;
        ClientDTO actual = this.clientService.update(clientInput);

        verify(clientRepository, times(1)).save(client);
        verify(clientTypeService, times(1)).getById(clientId);
        verify(clientRepository, times(1)).existsById(clientId);
        verify(orderService, times(1)).getOrdersByIds(orderIds);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    public void whenDeleteCalledThenClient() {
        when(clientRepository.findById(clientId)).thenReturn(Optional.of(client));
        doNothing().when(clientRepository).deleteById(clientId);
        doNothing().when(orderService).deleteOrders(clientId);

        clientService.deleteById(clientId);
        
        verify(clientRepository, times(1)).findById(clientId);
        verify(clientRepository, times(1)).deleteById(clientId);
        verify(orderService, times(1)).deleteOrders(clientId);
    }
}
